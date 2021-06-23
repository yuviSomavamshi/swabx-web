import { MatxLoadable } from "matx";

const Customers = MatxLoadable({
  loader: () => import("../Customers")
});
const BarcodePage = MatxLoadable({
  loader: () => import("../BarcodePage")
});

const formsRoutes = [
  {
    path: "/customers",
    component: Customers
  },
  {
    path: "/barcode",
    component: BarcodePage
  }
];

export default formsRoutes;
