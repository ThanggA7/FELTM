import Friends from "../Pages/Friends/Friends";
import Home from "../Pages/Home/Home";
import ShareFiles from "../Pages/ShareFiles/ShareFile";
import YourFiles from "../Pages/YourFiles/YourFile";

const PublicRouter = [
  { path: "/", component: Home },
  { path: "/files", component: YourFiles },
  { path: "/share", component: ShareFiles },
  { path: "/friends", component: Friends },
];

export default PublicRouter;
