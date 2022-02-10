import { lazy } from "react"

export const ROUTES = [
  {
    path: "/",
    title: "Home",
    main: lazy(() => import("new_pages/home")),
  },
  {
    path: "/mint-nft/:index",
    title: "Minted NFT Details",
    main: lazy(() => import("new_pages/nft-viewer")),
  },
  {
    path: "/nft/:index",
    title: "NFT Details",
    main: lazy(() => import("new_pages/nft-details")),
  },
  {
    path: "/mint-nft",
    title: "Create NFT",
    main: lazy(() => import("new_pages/create-nft")),
  },
  {
    path: "/explore-collections",
    title: "Explore Collections",
    main: lazy(() => import("new_pages/explore-collection")),
  },
  {
    path: "/explore-collection/:id",
    title: "Collection Details",
    main: lazy(() => import("new_pages/explore-collection-details")),
  },
  {
    path: "/explore-auctions",
    title: "Explore Auctions",
    main: lazy(() => import("new_pages/explore-auction")),
  },
  {
    path: "/explore-auction/:id",
    title: "Auction Details",
    main: lazy(() => import("new_pages/explore-auction-details")),
  },
  {
    path: "/create-auction",
    title: "Create Auction",
    main: lazy(() => import("new_pages/create-auction")),
  },
  {
    path: "/creators/:address",
    title: "Creators",
    main: lazy(() => import("new_pages/creator-details")),
  },
]
