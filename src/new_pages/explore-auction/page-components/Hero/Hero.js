import { useDebouncedCallback } from "use-debounce"
import { TextField, Breadcrumb } from "new_components"
import classes from "./Hero.module.scss"
import { Button } from "@blueprintjs/core"

import { ReactComponent as MagnifyIcon } from "new_assets/icons/magnify.svg"
import { ReactComponent as WaveShape } from "new_assets/shapes/collection-wave.svg"

export const Hero = ({
  onSearch,
  onAuctionTypeChange,
  auctionTypes,
  activeAuctionType,
}) => {
  const debounced = useDebouncedCallback((value) => {
    if (onSearch) onSearch(value)
  }, 500)

  return (
    <section className={classes.container}>
      <div className={classes.content}>
        <h1 className={classes.title}>Auctions</h1>
        <Breadcrumb
          paths={[
            {
              label: "Home",
              to: "/",
            },
            {
              label: "Auctions",
            },
          ]}
          className={classes.breadcrumb}
        />
        <div className={classes.auction_types}>
          <Button
            onClick={() => onAuctionTypeChange(auctionTypes.live)}
            minimal
            outlined
            intent="success"
            text="Live Auctions"
            className={classes.auction_type_live}
            type="button"
            active={activeAuctionType === auctionTypes.live}
          />
          <Button
            onClick={() => onAuctionTypeChange(auctionTypes.closed)}
            minimal
            outlined
            intent="danger"
            text="Closed Auctions"
            className={classes.auction_type_closed}
            type="button"
            active={activeAuctionType === auctionTypes.closed}
          />
        </div>
        <TextField
          icon={<MagnifyIcon />}
          placeholder="Search Auctions"
          className={classes["search-input"]}
          onChange={(e) => debounced(e.target.value)}
        />
      </div>

      <div className={classes.wave}>
        <div />
        <WaveShape />
      </div>
    </section>
  )
}
