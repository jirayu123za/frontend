"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { SetStateAction, useState } from "react";
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
type Product = {
  id: number;
  name: string;
  href: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
};
const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://i.pinimg.com/736x/62/92/44/629244440331e8b72abd8652c443c39c.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://i.pinimg.com/564x/a0/89/72/a08972f11ad0daed9a74d7058c730c26.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://i.pinimg.com/564x/5f/a0/6b/5fa06b6bbc9266662c1cf84c458c83f1.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://i.pinimg.com/736x/da/83/4b/da834b8dff9f73eb4eaeed3ecad39d57.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 5,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://t2.genius.com/unsafe/900x0/https%3A%2F%2Fimages.genius.com%2F77b0d1b460d9ba4d1388aad0722a8188.1000x1000x1.png",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 6,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://static.qobuz.com/images/covers/ca/xu/yacrh5ul5xuca_600.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 7,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://i.pinimg.com/564x/9d/d4/ed/9dd4ed60606cb198770feb1229b9ee57.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 8,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://i.pinimg.com/564x/25/ea/27/25ea271daa74cd3ecb500d6fbe3b5897.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 9,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://i.pinimg.com/736x/62/92/44/629244440331e8b72abd8652c443c39c.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 10,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://i.pinimg.com/564x/a0/89/72/a08972f11ad0daed9a74d7058c730c26.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 11,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://i.pinimg.com/564x/5f/a0/6b/5fa06b6bbc9266662c1cf84c458c83f1.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 12,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://i.pinimg.com/736x/da/83/4b/da834b8dff9f73eb4eaeed3ecad39d57.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  {
    id: 13,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://t2.genius.com/unsafe/900x0/https%3A%2F%2Fimages.genius.com%2F77b0d1b460d9ba4d1388aad0722a8188.1000x1000x1.png",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 14,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://static.qobuz.com/images/covers/ca/xu/yacrh5ul5xuca_600.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 15,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://i.pinimg.com/564x/9d/d4/ed/9dd4ed60606cb198770feb1229b9ee57.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 16,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://i.pinimg.com/564x/25/ea/27/25ea271daa74cd3ecb500d6fbe3b5897.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
];
const navigation = [{ name: "Dashboard", href: "#", current: true }];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html className="h-full bg-gray-100">
        <body className="h-full">
        ```
      */}
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-700">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <ShoppingBagIcon aria-hidden="true" className="h-6 w-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          src={user.imageUrl}
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <a
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                          >
                            {item.name}
                          </a>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    alt=""
                    src={user.imageUrl}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base/5 font-medium text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <header className="bg-white shadow"></header>
        <main>
          <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <svg
                className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                    width="200"
                    height="200"
                    x="50%"
                    y="-1"
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M100 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
                  <path
                    d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                    strokeWidth="0"
                  />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth="0"
                  fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
                />
              </svg>
            </div>
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
              <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                <div className="lg:pr-4">
                  <div className="lg:max-w-lg">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white mt-20 text-gray-900">
                      Album Sphere
                    </h1>
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white mt-6 text-gray-900">
                      .com
                    </h1>

                    <p className="mt-6 text-xl/8 text-gray-700">
                      is a website that collects and presents information on the
                      sale of music albums from various artists across different
                      genres, featuring both new releases and rare albums. It
                      allows music fans to easily choose and purchase their
                      favorite albums, along with reviews from real users.
                    </p>
                  </div>
                </div>
              </div>
              <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                <img
                  className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                  src="album.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <hr className="mt-14"></hr>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <a
                  onClick={() => handleProductClick(product)}
                  key={product.id}
                  href={product.href}
                  className="group"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 mt-6">
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {product.price}
                  </p>
                </a>
              ))}

              {selectedProduct && (
                <Dialog
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                  className="relative z-10"
                >
                  <div
                    className="fixed inset-0 bg-black/5"
                    aria-hidden="true"
                  />

                  <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
                      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={selectedProduct.imageSrc}
                          alt={selectedProduct.imageAlt}
                          className="object-cover"
                        />
                      </div>
                      <div className="mt-4">
                        <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                          {selectedProduct.name}
                        </Dialog.Title>
                        <p className="mt-2 text-sm text-gray-500">
                          {selectedProduct.price}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          This is a brief description of the product.
                        </p>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          type="submit"
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Add to bag
                        </button>
                      </div>
                    </Dialog.Panel>
                  </div>
                </Dialog>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
