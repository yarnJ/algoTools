import { Layout } from "new_components"
import { Form } from "./page-components"
import classes from "./auction.module.scss"

const CreateAuction = () => (
  <Layout container className={classes.container}>
    <Form className={classes.form} />
  </Layout>
)

export default CreateAuction
