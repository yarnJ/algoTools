import classes from "./Traits.module.scss"
import { useParams } from "react-router-dom"
import { calculate } from "utils/helper"

export const Traits = ({ items }) => {
  const { index } = useParams()
  const totalLength = items.length
  const selectedAssetTraits = items.find((li) => li.id.$numberLong === index)
  return (
    <section className={classes.container}>
      <div className={classes.header}>
        <div className={classes.header__left}>
          <h2 className={classes.header__title}>Traits</h2>
          <span className={classes.header__rank}>
            Rank: <span>2,746</span> of 2,999
          </span>
        </div>

        <div className={classes.header__right}>
          <div className={classes.header__rarity}>
            <span>87.5</span>
            <span>Rarity Score</span>
          </div>
        </div>
      </div>

      <ul className={classes.grid}>
        {selectedAssetTraits &&
          selectedAssetTraits.attributes &&
          selectedAssetTraits.attributes.length > 0 &&
          selectedAssetTraits.attributes.map((trait, idx) => (
            <li className={classes.trait} key={idx}>
              <div className={classes.trait__header}>
                <span>{trait.trait_type}</span>
                <span>{trait.value}</span>
              </div>
              <div className={classes["trait__progress-bar"]}>
                <div
                  className={classes.trait__progress}
                  style={{ width: `${calculate(items, trait, totalLength)}%` }}
                />
              </div>
              <span className={classes["trait__progress-percent"]}>
                {calculate(items, trait, totalLength)}% ({totalLength}x)
              </span>
            </li>
          ))}
      </ul>
    </section>
  )
}
