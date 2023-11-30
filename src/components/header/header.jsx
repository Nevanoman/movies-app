import { Input } from 'antd'
import _ from 'lodash'

import TabsHeader from '../tabs'

function HeaderSearch({ handleKeyUp }) {
  return (
    <div>
      <TabsHeader />
      <Input placeholder="Type to search..." onKeyUp={_.debounce(handleKeyUp, 1000)} />
    </div>
  )
}
export default HeaderSearch
