// ======= CHANGE HANDLER TO UPDATE STATE =========
export const onChangeHandler = (e) => {
  return this.setState({[e.target.name]: e.target.value})
}
