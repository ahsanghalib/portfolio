import config from 'config';
import { useRouter } from 'next/dist/client/router';
import { memo, useEffect, useMemo } from 'react';
import { Query } from 'types';
import { getRandomColorPair } from 'utils';
import ColorText from './ColorText';
import Conditional from './Conditional';

const { personal } = config;

interface BannerProps {
  onAbout: VoidFunction;
  onContact: VoidFunction;
}

function Banner(props: BannerProps): React.ReactElement {
  const { onAbout, onContact } = props;
  const [aboutColor, contactColor] = useMemo(getRandomColorPair, []);

  const router = useRouter();

  useEffect(() => {
    const query: Query = router.query;

    if (query?.action) {
      switch (query.action) {
        case 'about':
          onAbout();
          break;
        case 'contact':
          onContact();
          break;
        default:
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='banner flex flex-col flex-1 justify-center px-6 lg:px-10 py-10 dark:text-white'>
      <h1 className='text-3xl lg:text-5xl font-bold dark:text-white'>
        Hi, I am {personal.name}
      </h1>
      <p className='my-2 text-lg lg:my-4 lg:text-2xl font-light'>
        {personal.title}
      </p>
      <p className='lg:text-xl font-light'>
        Read more
        <ColorText
          className='mx-2'
          text='about me'
          backgroundColor={aboutColor}
          onClick={onAbout}
        />
        or
        <ColorText
          className='ml-2'
          text='contact me'
          backgroundColor={contactColor}
          onClick={onContact}
        />
      </p>
      <Conditional condition={personal.available}>
        <p className='lg:text-xl font-light mt-4 lg:mt-6'>
          <ColorText
            className='bg-black text-white dark:bg-white dark:text-black'
            text={`I'm available for hire!`}
            onClick={onContact}
          />
        </p>
      </Conditional>
    </div>
  );
}

export default memo(Banner);
