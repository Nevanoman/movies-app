import { Input } from 'antd'

import TabsHeader from '../tabs'

function HeaderSearch({ handleKeyUp }) {
  return (
    <div>
      <TabsHeader />
      <Input placeholder="Type to search..." onKeyUp={handleKeyUp} />
    </div>
  )
}
export default HeaderSearch
