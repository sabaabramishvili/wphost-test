import Image from 'next/image';
import styles from './NavigationBar.module.scss';
import Link from 'next/link';

const NavigationBar = () => {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.logoWrapper} href={'/'}>
        <Image src={'/wppp.png'} alt="wordpress" width={70} height={70} />
      </Link>
      <div className={styles.container}>
        <Link className={styles.contanerNav} href={'#'}>
          <Image
            src={'/dashboardblack.png'}
            alt="dashboard"
            width={24}
            height={24}
          />
          <span>Dashboard</span>
        </Link>
        <Link className={styles.contanerNav} href={'#'}>
          <Image src={'/pin.png'} alt="dashboard" width={24} height={24} />
          <span>Posts</span>
        </Link>
        <Link className={styles.contanerNav} href={'#'}>
          <Image src={'/camera.jpg'} alt="dashboard" width={24} height={24} />
          <span>Media</span>
        </Link>
        <Link className={styles.contanerNav} href={'#'}>
          <Image src={'/page.webp'} alt="dashboard" width={24} height={24} />
          <span>Pages</span>
        </Link>
        <Link className={styles.contanerNav} href={'#'}>
          <Image src={'/comments.png'} alt="dashboard" width={24} height={24} />
          <span>Comments</span>
        </Link>
        <Link className={styles.contanerNav} href={'#'}>
          <Image src={'/brush.jpg'} alt="dashboard" width={24} height={24} />
          <span>Apparance</span>
        </Link>
        <Link className={styles.contanerNav} href={'#'}>
          <Image src={'/plugin.png'} alt="dashboard" width={24} height={24} />
          <span>Plugins</span>
        </Link>
        <Link className={styles.contanerNav} href={'#'}>
          <Image src={'/user.png'} alt="dashboard" width={24} height={24} />
          <span>Users</span>
        </Link>
        <Link className={styles.contanerNav} href={'#'}>
          <Image src={'/tool.jpg'} alt="dashboard" width={24} height={24} />
          <span>Tools</span>
        </Link>
        <Link className={styles.contanerNav} href={'#'}>
          <Image src={'/settings.png'} alt="dashboard" width={24} height={24} />
          <span>Settings</span>
        </Link>
        <Link className={styles.contanerNav} href={'#'}>
          <Image src={'/language.png'} alt="dashboard" width={24} height={24} />
          <span>Languages</span>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
