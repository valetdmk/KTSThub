import "./Hero2.scss"
import secondtop from "../../Photos/secondtop.png"
import secondbottom from "../../Photos/secondbottom.png"
import forstudent1 from "../../Photos/forstudent1.png"
import forstudent2 from "../../Photos/forstudent2.png"
import forstudent3 from "../../Photos/forstudent3.png"
import forstudent4 from "../../Photos/forstudent4.png"
import forstudentcircle from "../../Photos/forstudentcircle.png"
import Boy from "../../Photos/Boy.png"

const features = [
    {
        img: forstudent1,
        title: "Реальный опыт IT-индустрии",
        text: "Личный кабинет с вашими активностями."
    },
    {
        img: forstudent3,
        title: "Контакт с HR компаний",
        text: "IT-специалисты команды и проекты в одном месте"
    },
    {
        img: forstudentcircle,
        title: "Студентам",
        text: "IT-специалисты команды и проекты в одном месте."
    },
    {
        img: forstudent4,
        title: "Рабочие проекты в портфолио",
        text: "IT-специалисты команды и проекты в одном месте."
    },
    {
        img: forstudent2,
        title: "Опыт командной работы",
        text: "IT-специалисты команды и проекты в одном месте"
    },
]

export const SecondSection = () => {
    return (
        <section className="secondslice">
            <div className="secondslice_inner">

                <div className="left-block">
                    <img className="second-top" src={secondtop} />
                    <img className="second-bottom" src={secondbottom} />
                    <img className="boy2" src={Boy} />
                </div>

                
            </div>

            <div className="features">
                {features.map((item, index) => (
                    <div className="feature" key={index}>
                        <img src={item.img} />
                        <h1>{item.title}</h1>
                        <p>{item.text}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}