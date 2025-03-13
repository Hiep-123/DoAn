import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { SideBarContext } from '@/context/sideBarProvider';
import classNames from 'classnames'
import Login from './login'
import { MdOutlineClose } from "react-icons/md";

function SideBar() {
    const { container, sideBar, overlay, slideSideBar, boxIcon } = styles;

    const { isOpen, setIsOpen, type } = useContext(SideBarContext);

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }
    const handleRenderSideBar = () => {
        switch (type) {
            case 'login':
                return <Login />

            default:
                return <Login />
        }
    }
    return (
        <div className={container}>
            <div className={classNames({
                [overlay]: isOpen
            })}
                onClick={handleToggle}
            />
            <div className={classNames(sideBar, {
                [slideSideBar]: isOpen
            })}>
                {isOpen && <div className={boxIcon}>
                    <MdOutlineClose onClick={handleToggle} />
                </div>}
                {handleRenderSideBar()}
            </div>
        </div>
    )
}

export default SideBar