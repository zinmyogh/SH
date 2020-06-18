import Vue from "vue";
import {
  Button,
  Container,
  Header,
  Main,
  Aside,
  Footer,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Upload,
  Dialog,
  Divider,
  Table,
  Tag,
  TableColumn,
  Popover,
  Message,
  MessageBox,
  Form,
  FormItem,
  Input,
  Checkbox,
  Popconfirm,
  Card,
  Icon,
} from "element-ui";

Vue.use(Button);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Footer);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(Table);
Vue.use(Tag);
Vue.use(TableColumn);
Vue.use(Popover);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Popconfirm);
Vue.use(Card);
Vue.use(Icon);

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$msgbox = MessageBox;
