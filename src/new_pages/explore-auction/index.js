import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Search } from "utils/search"
import { Layout } from "../../new_components"
import classes from "./index.module.scss"
import { AuctionCard, Hero } from "./page-components/index"

const indexes = [
  "appId",
  ["nft", "metadata", "name"],
  ["nft", "metadata", "description"],
]
const searchIndex = new Search({ id: "appId", indexes })
const auctionTypes = {
  live: "live",
  closed: "closed",
}

const NewExploreAuction = () => {
  const auctions = useSelector((state) => state.auction.auctions)

  const [query, setQuery] = useState("")
  const [filteredAuctions, setFilteredAuctions] = useState([])
  const [auctionType, setAuctionType] = useState("")

  useEffect(() => {
    searchIndex.addData(auctions)
    handleSearchAuctions(query)
  }, [auctions])

  useEffect(() => {
    filterAuctionsByType()
  }, [auctionType])

  const filterAuctionsByType = () => {
    const filteredBySearchKey = query ? searchIndex.search(query) : auctions
    switch (auctionType) {
      case auctionTypes.closed: {
        const filtered = filteredBySearchKey.filter(
          (auction) =>
            new Date(auction.endTime).getTime() <= new Date().getTime()
        )
        setFilteredAuctions(filtered)
        break
      }
      case auctionTypes.live: {
        const filtered = filteredBySearchKey.filter(
          (auction) =>
            new Date(auction.endTime).getTime() > new Date().getTime()
        )
        setFilteredAuctions(filtered)
        break
      }
      default: {
        setFilteredAuctions(filteredBySearchKey)
        break
      }
    }
  }

  const handleSearchAuctions = (e) => {
    setQuery(e)
    if (e) {
      const filtered = searchIndex.search(e)
      setFilteredAuctions(filtered)
    } else {
      setFilteredAuctions(auctions)
    }
  }

  const handleAuctionType = (type) => {
    switch (type) {
      case auctionTypes.closed: {
        if (auctionType === auctionTypes.closed) {
          setAuctionType("")
        } else {
          setAuctionType(auctionTypes.closed)
        }
        break
      }
      case auctionTypes.live: {
        if (auctionType === auctionTypes.live) {
          setAuctionType("")
        } else {
          setAuctionType(auctionTypes.live)
        }
        break
      }
      default: {
        setAuctionType("")
        break
      }
    }
  }

  return (
    <Layout>
      <Hero
        onSearch={handleSearchAuctions}
        onAuctionTypeChange={handleAuctionType}
        auctionTypes={auctionTypes}
        activeAuctionType={auctionType}
      />
      <div className={classes.container}>
        <div className={classes.grid}>
          {filteredAuctions &&
            filteredAuctions.map((auction) => (
              <AuctionCard key={auction.appId} {...auction} />
            ))}
        </div>
        {auctions && auctions.length === 0 && (
          <div className={classes["no-auctions"]}>
            <h1>No Auctions</h1>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default NewExploreAuction
