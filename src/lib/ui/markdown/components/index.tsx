import { HeaderComponents } from "./HeaderComponents";
import { ParagraphComponent } from "./ParagraphComponent";
import { TableComponent } from "./TableComponent";
import { ImageComponent } from "./ImageComponent";
import { ListComponents } from "./ListComponents";

const components = {
  ...HeaderComponents,
  ...ParagraphComponent,
  ...TableComponent,
  ...ImageComponent,
  ...ListComponents,
};

export default components;
