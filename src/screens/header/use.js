import { useContext } from "react";

import { HeaderContext } from "./context";

function useHeader() {
  return useContext(HeaderContext);
}

export default useHeader;
