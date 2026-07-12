import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

interface AnnotateModeValue {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  toggle: () => void;
}

const AnnotateModeContext = createContext<AnnotateModeValue | null>(null);

const TOAST_SHOWN_KEY = 'playground-annotate-toast-shown';
const BLOCKED_SELECTOR =
  'button, a, nav, .tag, .btn, .menu-island, .brand-island, .annotate-toolbar, .playground-launcher';

let markCountSnapshot = 0;
const markListeners = new Set<() => void>();

let toastSnapshot = false;
const toastListeners = new Set<() => void>();

function subscribeMarks(listener: () => void) {
  markListeners.add(listener);
  return () => markListeners.delete(listener);
}

function getMarkCount() {
  return markCountSnapshot;
}

function setMarkCount(next: number) {
  markCountSnapshot = next;
  markListeners.forEach((listener) => listener());
}

function bumpMarkCount(by: number) {
  setMarkCount(markCountSnapshot + by);
}

function subscribeToast(listener: () => void) {
  toastListeners.add(listener);
  return () => toastListeners.delete(listener);
}

function getShowToast() {
  return toastSnapshot;
}

function setShowToast(next: boolean) {
  toastSnapshot = next;
  toastListeners.forEach((listener) => listener());
}

function clearDomMarks() {
  document.querySelectorAll('mark.annotate-mark').forEach((node) => {
    const parent = node.parentNode;
    if (!parent) return;
    while (node.firstChild) {
      parent.insertBefore(node.firstChild, node);
    }
    parent.removeChild(node);
    parent.normalize();
  });
  setMarkCount(0);
}

function isBlocked(el: Element | null): boolean {
  return Boolean(el?.closest(BLOCKED_SELECTOR));
}

function collectTextNodes(range: Range, annotatable: Element): Text[] {
  const root =
    range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? (range.commonAncestorContainer as Element)
      : range.commonAncestorContainer.parentElement;

  if (!root || !annotatable.contains(root)) return [];

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node = walker.nextNode();

  while (node) {
    const text = node as Text;
    const parent = text.parentElement;

    if (
      text.length > 0 &&
      annotatable.contains(text) &&
      parent &&
      !isBlocked(parent) &&
      !parent.closest('mark.annotate-mark') &&
      range.intersectsNode(text)
    ) {
      nodes.push(text);
    }

    node = walker.nextNode();
  }

  return nodes;
}

function wrapTextNodeSlice(textNode: Text, start: number, end: number): boolean {
  if (start >= end) return false;

  const slice = document.createRange();
  slice.setStart(textNode, start);
  slice.setEnd(textNode, end);

  try {
    const mark = document.createElement('mark');
    mark.className = 'annotate-mark';
    slice.surroundContents(mark);
    return true;
  } catch {
    return false;
  }
}

function applyHighlight(range: Range, annotatable: Element): number {
  try {
    const mark = document.createElement('mark');
    mark.className = 'annotate-mark';
    range.surroundContents(mark);
    return 1;
  } catch {
    // Multi-node selections can't use surroundContents — wrap each text slice.
  }

  const textNodes = collectTextNodes(range, annotatable);
  let applied = 0;

  for (let i = textNodes.length - 1; i >= 0; i -= 1) {
    const textNode = textNodes[i];
    const start = textNode === range.startContainer ? range.startOffset : 0;
    const end = textNode === range.endContainer ? range.endOffset : textNode.length;

    if (wrapTextNodeSlice(textNode, start, end)) {
      applied += 1;
    }
  }

  return applied;
}

export function AnnotateProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);

  const setEnabled = useCallback((next: boolean) => {
    setEnabledState(next);
    if (next) {
      const seen = sessionStorage.getItem(TOAST_SHOWN_KEY);
      if (!seen) {
        setShowToast(true);
        sessionStorage.setItem(TOAST_SHOWN_KEY, '1');
      }
    } else {
      clearDomMarks();
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled(!enabled);
  }, [enabled, setEnabled]);

  useEffect(() => {
    document.documentElement.classList.toggle('annotate-mode', enabled);
    document.body.style.cursor = enabled
      ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23f5c518\' stroke=\'%23111111\' stroke-width=\'1\' d=\'M3 21l1.5-6L17 2.5a2 2 0 0 1 2.8 0l1.7 1.7a2 2 0 0 1 0 2.8L8.5 19.5 3 21z\'/%3E%3C/svg%3E") 2 22, text'
      : '';
    return () => {
      document.documentElement.classList.remove('annotate-mode');
      document.body.style.cursor = '';
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerUp = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const startEl =
        range.startContainer.nodeType === Node.ELEMENT_NODE
          ? (range.startContainer as Element)
          : range.startContainer.parentElement;
      const endEl =
        range.endContainer.nodeType === Node.ELEMENT_NODE
          ? (range.endContainer as Element)
          : range.endContainer.parentElement;

      const annotatable = startEl?.closest('[data-annotatable]');
      if (!annotatable || !endEl || !annotatable.contains(endEl)) {
        return;
      }

      if (isBlocked(startEl) || isBlocked(endEl)) return;

      const applied = applyHighlight(range.cloneRange(), annotatable);
      if (applied > 0) {
        selection.removeAllRanges();
        bumpMarkCount(applied);
      }
    };

    document.addEventListener('mouseup', handlePointerUp);
    document.addEventListener('touchend', handlePointerUp);
    return () => {
      document.removeEventListener('mouseup', handlePointerUp);
      document.removeEventListener('touchend', handlePointerUp);
    };
  }, [enabled]);

  const modeValue = useMemo(
    () => ({
      enabled,
      setEnabled,
      toggle,
    }),
    [enabled, setEnabled, toggle],
  );

  return (
    <AnnotateModeContext.Provider value={modeValue}>{children}</AnnotateModeContext.Provider>
  );
}

export function useAnnotateMode() {
  const context = useContext(AnnotateModeContext);
  if (!context) {
    throw new Error('useAnnotateMode must be used within AnnotateProvider');
  }
  return context;
}

export function useAnnotateMarks() {
  const markCount = useSyncExternalStore(subscribeMarks, getMarkCount, () => 0);
  return {
    markCount,
    clearMarks: clearDomMarks,
  };
}

export function useAnnotateToast() {
  const showToast = useSyncExternalStore(subscribeToast, getShowToast, () => false);
  return {
    showToast,
    dismissToast: () => setShowToast(false),
  };
}

export function useAnnotate() {
  return { ...useAnnotateMode(), ...useAnnotateMarks(), ...useAnnotateToast() };
}
