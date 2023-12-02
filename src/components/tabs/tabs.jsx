import './tabs.css'
import { Tabs } from 'antd'

function TabsHeader({ onClick }) {
  const items = [
    {
      key: 'Search',
      label: 'Search',
    },
    {
      key: 'Rated',
      label: 'Rated',
    },
  ]
  return <Tabs defaultActiveKey="1" centered items={items} className="contentStyle" onChange={onClick} />
}
export default TabsHeader
