
import balance from '~/components/images/img_producer/balance.webp'
import clarks from '~/components/images/img_producer/clarks.webp'
import converse from '~/components/images/img_producer/converse.webp'
import nike from '~/components/images/img_producer/nike.webp'
import puma from '~/components/images/img_producer/puma.webp'
import vans from '~/components/images/img_producer/vans.webp'

import classNames from 'classnames/bind';
import styles from './Producers.module.scss';

const cx = classNames.bind(styles);

export const producers = [
    {
        id: 1,
        image: balance
    },
    {
        id: 2,
        image: clarks
    },
    {
        id: 3,
        image: converse
    },
    {
        id: 4,
        image: nike
    },
    {
        id: 5,
        image: puma
    },
    {
        id: 6,
        image: vans
    }
]




function ProducerTable() {
    // Tạo một mảng các ô (<td>) từ mảng producers
    const cells = producers.map((producer) => (
        <td key={producer.id}>
            <img src={producer.image} alt={producer.image} className={cx('imgProducer')} />
        </td>


    ));

    // Tạo một mảng các hàng (<tr>) từ mảng cells
    const rows = [];
    for (let i = 0; i < cells.length; i += 2) {
        rows.push(<tr key={i}>{cells.slice(i, i + 2)}</tr>);
    }

    return (<table className={cx('table_producer')}><tbody>{rows}</tbody></table>);
}

export default ProducerTable;