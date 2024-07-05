import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Input,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  Bars2Icon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../features/auth/userSlice";
import { useNavigate } from "react-router";
import { clearCart } from "../features/carts/cartSlice";
import { useFormik } from "formik";


const userProfile = [
  {
    label: "Profile",
    icon: UserCircleIcon,
    value: 'profile'
  },
  {
    label: "Carts",
    icon: ShoppingCartIcon,
    value: 'carts'
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    value: 'logout'
  },
];

const adminProfile = [
  {
    label: "Profile",
    icon: UserCircleIcon,
    value: 'profile'
  },
  {
    label: "Products",
    icon: ShoppingBagIcon,
    value: 'products'
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    value: 'logout'
  },
];



function ProfileMenu({ user }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const closeMenu = () => setIsMenuOpen(false);
  const menuItems = user.isAdmin ? adminProfile : userProfile;

  const handleClick = (val) => {
    switch (val) {
      case 'profile':
        nav('/userProfile');
        break;

      case 'carts':
        nav('/carts');
        break;

      case 'products':
        nav('/allProducts');
        break;

      case 'logout':
        dispatch(clearCart());
        dispatch(userLogOut());



    }
    closeMenu();

  }


  return (
    <>

      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {menuItems.map(({ label, icon, value }, key) => {
            const isLastItem = key === menuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => handleClick(value)}
                className={`flex items-center gap-2 rounded ${isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
                  }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
}


const Header = () => {

  const { user } = useSelector((state) => state.userSlice);

  const nav = useNavigate();
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const formik = useFormik({
    initialValues: {
      query: ''
    },
    onSubmit: (val, { resetForm }) => {
      nav(`/search-page/${val.query}`);
      resetForm();
    }
  });
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Material Tailwinds
        </Typography>

        <div className="flex gap-10">

          <form onSubmit={formik.handleSubmit} className="hidden items-center gap-x-2 lg:flex">
            <div className="relative flex w-full gap-2 md:w-max">
              <Input
                type="search"
                name="query"
                onChange={formik.handleChange}
                value={formik.values.query}
                placeholder="Search"
                containerProps={{
                  className: "min-w-[288px]",
                }}
                className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="!absolute left-3 top-[13px]">
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.97811 7.95252C10.2126 7.38634 10.3333 6.7795 10.3333 6.16667C10.3333 4.92899 9.84167 3.742 8.9665 2.86683C8.09133 1.99167 6.90434 1.5 5.66667 1.5C4.42899 1.5 3.242 1.99167 2.36683 2.86683C1.49167 3.742 1 4.92899 1 6.16667C1 6.7795 1.12071 7.38634 1.35523 7.95252C1.58975 8.51871 1.93349 9.03316 2.36683 9.4665C2.80018 9.89984 3.31462 10.2436 3.88081 10.4781C4.447 10.7126 5.05383 10.8333 5.66667 10.8333C6.2795 10.8333 6.88634 10.7126 7.45252 10.4781C8.01871 10.2436 8.53316 9.89984 8.9665 9.4665C9.39984 9.03316 9.74358 8.51871 9.97811 7.95252Z"
                    fill="#CFD8DC"
                  />
                  <path
                    d="M13 13.5L9 9.5M10.3333 6.16667C10.3333 6.7795 10.2126 7.38634 9.97811 7.95252C9.74358 8.51871 9.39984 9.03316 8.9665 9.4665C8.53316 9.89984 8.01871 10.2436 7.45252 10.4781C6.88634 10.7126 6.2795 10.8333 5.66667 10.8333C5.05383 10.8333 4.447 10.7126 3.88081 10.4781C3.31462 10.2436 2.80018 9.89984 2.36683 9.4665C1.93349 9.03316 1.58975 8.51871 1.35523 7.95252C1.12071 7.38634 1 6.7795 1 6.16667C1 4.92899 1.49167 3.742 2.36683 2.86683C3.242 1.99167 4.42899 1.5 5.66667 1.5C6.90434 1.5 8.09133 1.99167 8.9665 2.86683C9.84167 3.742 10.3333 4.92899 10.3333 6.16667Z"
                    stroke="#CFD8DC"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <Button type="submit" size="sm" className="rounded-lg ">
              Search
            </Button>

          </form>

          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>

          {user === null ? <Button onClick={() => nav('/login')} size="sm" variant="text">
            <span>Log In</span>
          </Button> :


            <ProfileMenu user={user} />
          }
        </div>
      </div>

    </Navbar>
  );
}


export default Header;



