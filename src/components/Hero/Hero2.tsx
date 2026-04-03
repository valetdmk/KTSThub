import "./Hero2.scss"
import { useRef } from "react"

import secondtop from "../../Photos/secondtop.png"
import secondbottom from "../../Photos/secondbottom.png"
import forstudent1 from "../../Photos/forstudent1.png"
import forstudent2 from "../../Photos/forstudent2.png"
import forstudent3 from "../../Photos/forstudent3.png"
import forstudent4 from "../../Photos/forstudent4.png"
import forstudentcircle from "../../Photos/forstudentcircle.png"
import Boy from "../../Photos/Boy.png"

export const SecondSection = () => {

    const featuresRef = useRef<HTMLDivElement | null>(null)

    const scrollUp = () => {
        featuresRef.current?.scrollBy({
            top: -200,
            behavior: "smooth",
        })
    }

    const scrollDown = () => {
        featuresRef.current?.scrollBy({
            top: 200,
            behavior: "smooth",
        })
    }

    return (
        <section className="secondslice">

            {/* СТРЕЛКИ */}
            <div className="scroll-buttons">
                <button onClick={scrollUp}>↑</button>
                <button onClick={scrollDown}>↓</button>
            </div>

            <div className="secondslice_inner">

                <div className="left-block">
                    <img className="second-top" src={secondtop} />
                    <img className="second-bottom" src={secondbottom} />
                    <img className="boy2" src={Boy} />
                </div>

                {/* ВОТ ВАЖНО: обёртка со скроллом */}
                <div className="features-scroll" ref={featuresRef}>

                    <div className="features">

                        {/* ТВОИ КАРТОЧКИ — БЕЗ ИЗМЕНЕНИЙ */}
                        <div className="col left">
                            <div className="feature">
                                <img src={forstudent1} />
                                <div className="content">
                                    <h1>Реальный опыт IT-индустрии</h1>
                                    <p>Личный кабинет с вашими активностями.</p>
                                </div>
                            </div>

                            <div className="feature">
                                <img src={forstudentcircle} />
                                <div className="content">
                                    <h1>Студентам</h1>
                                    <p>IT-специалисты команды и проекты в одном месте.</p>
                                </div>
                            </div>

                            <div className="feature">
                                <img src={forstudent2} />
                                <div className="content">
                                    <h1>Опыт командной работы</h1>
                                    <p>IT-специалисты команды и проекты в одном месте</p>
                                </div>
                            </div>
                        </div>

                        <div className="col right">
                            <div className="feature">
                                <img src={forstudent3} />
                                <div className="content">
                                    <h1>Контакт с HR компаний</h1>
                                    <p>IT-специалисты команды и проекты в одном месте</p>
                                </div>
                            </div>

                            <div className="feature">
                                <img src={forstudent4} />
                                <div className="content">
                                    <h1>Рабочие проекты в портфолио</h1>
                                    <p>IT-специалисты команды и проекты в одном месте.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}