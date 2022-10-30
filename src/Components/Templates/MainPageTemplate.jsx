import styled from 'styled-components'
import ContentSlideSection from '../Organisms/ContentSlideSection';
import MainHeader from '../Organisms/MainHeader';
import SubHeader from '../Organisms/SubHeader';


const MainPageTemplateWrapper = styled.div `
    width: 100vw;
`;

function MainPageTemplate({trendMovies, trendTvs, gbsPick}) {
    return (
        <>
            <SubHeader/>
            <MainHeader/>
            <MainPageTemplateWrapper className='fc fleft'>
                <div className='fr fcenter'>
                    <ContentSlideSection sectionTitle={'🍿 인기 영화'} datas={trendMovies} type="movie" page={'movie'}/>
                </div>
                <div className='fr fcenter'>
                    <ContentSlideSection sectionTitle={'📺 인기 TV 프로그램'} datas={trendTvs} type="tv" page={'tv'}/>
                </div>
                <div className='fr fcenter'>
                    <ContentSlideSection sectionTitle={'내가 최근에 본거임'} datas={gbsPick} type="movie" page={'movie'}/>
                </div>
            </MainPageTemplateWrapper>
        </>
    )
}

export default MainPageTemplate
