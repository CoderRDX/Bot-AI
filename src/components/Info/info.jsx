import styles from './info.module.css'
export default function Info(){
    return(
        <div className={styles.start}>
            <h2>How Can I Help You Today?</h2>
            <img  className={styles.img3} src={require("../../assests/image-29.png")} alt="" height={69} />
            <div className={styles.Info}>
                <div >
                    <h3>Hi, what is the weather</h3>
                    <p>Get immediate AI generated response</p>
                </div>

                <div>
                    <h3>Hi, what is my location</h3>
                    <p>Get immediate AI generated response</p>
                </div>

                <div>
                    <h3>Hi, what is the temperature</h3>
                    <p>Get immediate AI generated response</p>
                </div>

                <div>
                    <h3>Hi, how are you</h3>
                    <p>Get immediate AI generated response</p>
                </div>
            </div>
        </div>
       
    )
}