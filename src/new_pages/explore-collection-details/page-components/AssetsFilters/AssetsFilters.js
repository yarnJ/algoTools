import classes from "./AssetsFilters.module.scss"

export const AssetsFilters = ({ selectedCollection }) => (
  <section className={classes.container}>
    <span>{selectedCollection?.artworks} Artworks</span>
    <div className={classes.sort}>
      <span>Sort By</span>
      <select>
        <option value="newest">Date Listed: Newest</option>
      </select>
    </div>
  </section>
)
