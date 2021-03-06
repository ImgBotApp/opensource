import React from 'react'
import DocumentTitle from 'react-document-title'
import { orderBy } from 'lodash'
import store from '~/store/store'
import Loading from '~/components/loading/Loading'
import DeveloperList from '~/components/developer-list/DeveloperList'

class PopularDevelopers extends React.Component {
  state = {
    users: [],
    loading: true,
    error: false
  }
  componentDidMount() {
    store.getUsers().then((response) => {
      this.setState({
        users: response.items,
        loading: !response.ready,
        error: response.error
      })
    })
  }
  render() {
    const { users, loading, error } = this.state
    if (loading) {
      return <Loading />
    }

    const orderedUsers = orderBy(users, ['followers', 'name'], ['desc', 'asc'])

    return (
      <DocumentTitle title="Popular Developers – Dominican Open Source">
        <DeveloperList users={orderedUsers} />
      </DocumentTitle>
    )
  }
}

export default PopularDevelopers
