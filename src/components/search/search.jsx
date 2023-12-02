import { Input } from 'antd'
import _ from 'lodash'
import './search.css'

function HeaderSearch({ handleKeyUp }) {
  return (
    <div>
      <Input placeholder="Type to search..." className="search" onKeyUp={_.debounce(handleKeyUp, 1000)} />
    </div>
  )
}
export default HeaderSearch
