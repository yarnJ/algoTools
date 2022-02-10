import { useTitle } from "react-use"

const RouteWrapper = ({ route: { main: Main, title }, ...routeProps }) => {
  useTitle(`${title} | YNFT Club`)
  return (
    <>
      <Main {...routeProps} />
    </>
  )
}

export default RouteWrapper
