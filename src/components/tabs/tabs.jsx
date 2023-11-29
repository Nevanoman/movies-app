import './tabs.css'
import { Tabs } from 'antd'

function TabsHeader() {
  const items = [
    {
      key: '1',
      label: 'Search',
    },
    {
      key: '2',
      label: 'Rated',
    },
  ]
  return <Tabs defaultActiveKey="1" centered items={items} className="contentStyle" />
}

export default TabsHeader
