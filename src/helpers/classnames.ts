export function b(block: string): (element: string) => string {
  return (element?: string): string => {
    return element ? `${block}__${element}` : block;
  };
}
