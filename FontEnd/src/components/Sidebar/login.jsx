import React, { useState } from 'react'
import { HiOutlineUser } from "react-icons/hi";
import Button from '@components/Button/Button'
import styles from './styles.module.scss'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

function login() {
    const { containerLogin, containerBox, containerBox2, box1, box2, box3, containerBox3, containerBox4, input, active } = styles
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className={containerLogin}>
            <div className={containerBox}>
                <div>
                    <HiOutlineUser size={'50'} />
                </div>
                <span>MY ACCOUNT</span>
            </div>

            <div className={containerBox2}>
                <div className={box1}>
                    <div style={{
                        borderBlockWidth: '5px',
                        cursor: 'pointer'
                    }}
                        className={!isRegister ? active : ""}
                        onClick={() => setIsRegister(false)}>LOGIN</div>
                    <div style={{
                        borderBlockWidth: '5px',
                        cursor: 'pointer'
                    }}
                        className={isRegister ? active : ""}
                        onClick={() => setIsRegister(true)}>REGISTER</div>
                </div>
            </div>

            <div className={containerBox3}>
                <div className={box2}>
                    <div
                        onChange={(e) => setName(e.target.addEventListener)}>{!isRegister ? 'Username or email' : 'Email address'}<span style={{
                            color: 'red'
                        }}>*</span></div>
                    <input type="text" />
                </div>

                <div className={box2} >
                    <div
                        onChange={(e) => setPassword(e.target.addEventListener)}>
                        Password <span style={{
                            color: 'red'
                        }}>*</span>
                    </div>
                    <div className={input}>
                        <input type={`${showPassword ? 'text' : 'password'}`} />
                        <div onClick={handleShowPassword}
                            style={{
                                cursor: 'pointer'
                            }}>
                            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                        </div>
                    </div>
                </div>

                {!isRegister && (<div className={containerBox4}>
                    <div className={box3}>
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </div>
                    <div style={{
                        fontSize: '20px',
                        cursor: 'pointer',
                        textDecorationLine: 'underline',
                        fontWeight: 'bold'
                    }}>
                        Lost Password ?
                    </div>

                </div>)}
            </div>

            <Button content={!isRegister ? 'Log in' : 'Register'} isPrimary={true} />
        </div>
    )
}

export default login