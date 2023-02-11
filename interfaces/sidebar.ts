export interface ISidebarOption {
  text: "Questions" | "Tags" | "Users";
  icon: JSX.Element;
  routeTo: string;
}
