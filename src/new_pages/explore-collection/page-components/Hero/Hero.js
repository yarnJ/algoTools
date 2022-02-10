import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useDebouncedCallback } from "use-debounce"
import { Search } from "utils/search"
import { TextField, Breadcrumb } from "new_components"
import { setFilteredCollections } from "redux/collection/collection-slice"
import { ReactComponent as MagnifyIcon } from "new_assets/icons/magnify.svg"
import { ReactComponent as WaveShape } from "new_assets/shapes/collection-wave.svg"
import classes from "./Hero.module.scss"

const indexes = ["id", "name", "creator", "creatorAddress"]
const searchIndex = new Search({ indexes })

export const Hero = ({ newCollect, setSearchStatus }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    searchIndex.addData(newCollect)
  }, [newCollect])

  const debounced = useDebouncedCallback((value) => {
    if (value) {
      const filteredCollections = searchIndex.search(value)
      dispatch(setFilteredCollections(filteredCollections))
      setSearchStatus(true)
    } else {
      setSearchStatus(false)
    }
  }, 500)

  return (
    <section className={classes.container}>
      <div className={classes.content}>
        <h1 className={classes.title}>Collections</h1>
        <Breadcrumb
          paths={[
            {
              label: "Home",
              to: "/",
            },
            {
              label: "Collections",
            },
          ]}
          className={classes.breadcrumb}
        />
        <TextField
          icon={<MagnifyIcon />}
          placeholder="Search Collections"
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
