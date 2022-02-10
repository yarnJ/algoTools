import { Breadcrumb } from "new_components"
import classes from "./Hero.module.scss"
import { ReactComponent as WaveShape } from "new_assets/shapes/collection-wave.svg"
// import { ReactComponent as MagnifyIcon } from "new_assets/icons/magnify.svg"

export const Hero = ({ collection }) => (
  <section className={classes.container}>
    <div className={classes.content}>
      <h1 className={classes.title}>{collection?.name}</h1>
      <Breadcrumb
        paths={[
          {
            label: "Home",
            to: "/",
          },
          {
            label: "Collections",
            to: "/explore-collections",
          },
          {
            label: collection?.name,
          },
        ]}
        className={classes.breadcrumb}
        showVerifiedIcon
      />
      {/* <TextField
        icon={<MagnifyIcon />}
        placeholder="Search Collections"
        className={classes["search-input"]}
      /> */}
    </div>

    <div className={classes.wave}>
      <div />
      <WaveShape />
    </div>
  </section>
)
