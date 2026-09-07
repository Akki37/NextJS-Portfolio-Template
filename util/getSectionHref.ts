export interface SectionHrefProps {
    hash: string
    atPath?: string;
    checkPath?: string;
};
export function getSectionHref (props: SectionHrefProps)  {
  const { hash, atPath, checkPath } = props;
  const isAtPath = checkPath === atPath;
  return isAtPath ? hash : `/${hash}`;
};
