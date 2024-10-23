import RoleAdd from './components/RoleAdd/RoleAdd'
import RoleDelete from './components/RoleDelete/RoleDelete'
import RoleList from './components/RoleList/RoleList'
import styles from './Roles.module.scss'
const Roles = () => {
    return(
        <div className={styles.container}>
            <RoleDelete/>
            <RoleAdd/>
            <RoleList/>
        </div>
    )
}
export default Roles