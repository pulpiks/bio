import { createElement } from 'react'
import { Card as AntdCard} from 'antd'
import { cnClass, combineClassName } from '../../utils/cnClass';

import './styles.css'
import { Link } from 'react-router-dom';

interface CardProps {
  readonly title: string
  readonly description: string
  readonly slug?: string
  readonly className?: string,
  readonly size?: keyof typeof size
}

const cn = cnClass('card')

enum size {
  'large' = 'lg',
  'medium' = 'md',
  'small' = 'sm'  
}

export const Card = (data: CardProps) => {
  const classNames = cn({
    size: data.size ? size[data.size] : size.medium,  
  })
  return (
      <AntdCard className={ 
        combineClassName(
          data.className, 
          classNames
        )}
          title={data.title}
          extra={data.slug && <Link to={data.slug}>Go</Link>}
          >
        <p>{data.description}</p>
      </AntdCard>
  )  
}