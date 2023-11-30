import { Pagination } from 'antd'

function PaginationFooter({ page }) {
  return <Pagination defaultCurrent={page} total={50} />
}

export default PaginationFooter
