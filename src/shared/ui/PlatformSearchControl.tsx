import { useRef } from "react";
import { PlatformIcon } from "./PlatformIcon";

export function PlatformSearchControl() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <label className="platform-search">
        <input ref={inputRef} type="search" placeholder="Поиск" aria-label="Поиск" />
      </label>
      <button
        type="button"
        className="platform-round-button"
        aria-label="Начать поиск"
        onClick={() => inputRef.current?.focus()}
      >
        <PlatformIcon name="search" />
      </button>
    </>
  );
}
