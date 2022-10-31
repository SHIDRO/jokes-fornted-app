import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Jokes from '../components/Jokes';
import PaginationSection from '../components/PaginationSection';

const HomeByHashtag = ({ }) => {
    const { hashtagName } = useParams();
    const { hashtags, globalJokes } = useSelector(state => state.jokesData)

    const isHashtag = hashtags.find(h => h.hashtag.toLowerCase() === hashtagName.toLowerCase());
    if (!isHashtag) {
        return <h1 style={{ textAlign: 'center', paddingTop: '20px' }}>couldn't find your hashtag</h1>
    }

    let foundJokes = globalJokes.filter(j => j.hashtag.hashtag.toLowerCase() === isHashtag.hashtag.toLowerCase());

    return (
        <div>
            <h1>#{hashtagName}</h1>
            <Jokes jokes={foundJokes} />
            <PaginationSection numOfPages={10}/>
        </div>
    )
}

export default HomeByHashtag;
