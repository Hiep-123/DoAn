import React from 'react'
<<<<<<< HEAD
import styles from './styles.module.css';
=======
import styles from './styles.module.scss';
>>>>>>> 8d49d79 (update code section advanceHeadling)


function MainLayout({ children }) {
    const { wrapLayout, container } = styles;
    return (
        <main className={wrapLayout}>
            <div className={container}>{children}</div>
        </main>

    )
}

export default MainLayout