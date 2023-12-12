import { Pagination } from 'antd'

function PaginationFooter({ page }) {
  return <Pagination current={page} total={50} />
}

export default PaginationFooter
