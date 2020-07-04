import React, { useEffect } from 'react';
import { StatusBar, View, TouchableOpacity, Platform } from 'react-native';
import { ScrollabeContainer, Container } from '~/components';
import { Header, LogoImage, ProfileImage, UserName, SpeechContainer, SpeechTime, SpeechName, SpeechPresenter } from './styles';
import { useTheme } from 'styled-components';
import { Title, Text, Caption } from '~/components/Typography';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { AuthenticationState } from '~/store/ducks/authentication/types';
import AuthenticationActions from '~/store/ducks/authentication/actions';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '~/store';
import api from '~/services/api';

const userProfile = require("assets/user-profile.png")
export interface ISpeech {
    category: "academic" | "technician" | "market",
    speech_day: Date,
    name: string,
    presenter: string,
    presenter_description: string,
    speech_description: string
}

const speeches: ISpeech[] = [
    {
        category: "academic",
        speech_day: new Date(2020, 6, 9, 18, 45),
        name: "Por que escolher a pesquisa em tecnologia com um mercado tão promissor?",
        presenter: "Jean Martina, Fernanda Gomes e Thais Idalino",
        presenter_description: "Jean é doutor em ciência da computação pela Cambridge University e Newton Advanced Fellow of the Royal SOciety; Fernanda é Mestre e Doutoranda em Ciência da Computação pela Universidade Federal de Santa Catarina com área de pesquisa em Privacidade de Dados; Thais é Doutora em Ciência da Computação pela Universidade de Ottawa e pós-doutoranda pela Simon Fraser University, Canadá",
        speech_description: "Nesta talk, os convidados trarão suas experiências no meio acadêmico da área de TI. Cada um com sua trajetória, todos decidiram seguir a área acadêmica mesmo estando num setor com mercado tão privilegiado. Vamos entender as motivações!"
    },
    {
        category: "technician",
        speech_day: new Date(2020, 6, 9, 19, 45),
        name: "De Sistemas para o mundo!",
        presenter: "Camila Maia",
        presenter_description: "Backend engineer na Loadsmart",
        speech_description: "Apesar de ter backend como foco de trabalho, e conteúdo preferido, Camila gosta de aprender com diferentes áreas com as quais tem contato no trabalho. Vamos conhecer mais do trabalho de Camila que já trabalhou em laboratórios da UFSC, startup brasileira, húngara e agora americana!"
    },
    {
        category: "market",
        speech_day: new Date(2020, 6, 9, 20, 45),
        name: "Tecnologia: escalando uma indústria analógica",
        presenter: "Rodrigo Regis",
        presenter_description: "Empreendedor com 20 anos de mercado financeiro. Trading desk head. Chief Product Owner. Sócio da XP Investimentos por 11 anos.",
        speech_description: "O papel da tecnologia em uma indústria analógica! Rodrigo vai conversar com a gente sobre como foi liderar o setor de tecnologia numa empresa de setor tradicional do mercado."
    },
    {
        category: "academic",
        speech_day: new Date(2020, 6, 16, 18, 45),
        name: "Faculdade de TI não te prepara para o mercado?",
        presenter: "Jean Hauck",
        presenter_description: "Jean é doutor em Engenharia do Conhecimento, com área de pesquisa em Engenharia de Software. Atualmente é professor e vice coordenador do curso de Sistemas de Informação da UFSC. Foi pesquisador visitante no Regulated Software Research Centre na Dundalk Institute of Technology, Irlanda",
        speech_description: "Nesta talk, o professor Jean vem apresentar alguns contrapontos ao discurso muito reproduzido de que a faculdade não prepara o aluno para o mercado de TI, e que este apresenta uma realidade muito diferente do ensinado em sala de aula."
    },
    {
        category: "technician",
        speech_day: new Date(2020, 6, 16, 19, 45),
        name: "Kanban: criando uma cultura de aprimoramento contínuo",
        presenter: "Roberta Lingnau de Oliveira",
        presenter_description: "Project Manager na Cheesecake Labs. Team Kanbam Practitioner pela Kanbam University",
        speech_description: "Roberta apresenta o Kanban nessa talk! Vamos entender como a metodologia é utilizada no gerenciamento de projetos e quais seus benefícios. Vamos com quem entende do assunto!"
    },
    {
        category: "market",
        speech_day: new Date(2020, 6, 16, 20, 45),
        name: "Escalando um time de tecnologia focado em retenção",
        presenter: "Andrio Frizon",
        presenter_description: "Head of people na Jungle Devs",
        speech_description: "Andrio nos conta como é formado o time Jungle Devs, uma empresa que não possui um marketing de recrutamento convencional. Como atraem e por quê as pessoas permanecem? Vamos descobrir!"
    },
    {
        category: "academic",
        speech_day: new Date(2020, 6, 23, 18, 45),
        name: "O INE e a pesquisa científica: uma visão geral e os primeiros passos para contribuir para o avanço da ciência",
        presenter: "Márcio Castro",
        presenter_description: "Márcio é Doutor em Ciência da Computação, com área de pesquisa em processamento paralelo e distribuído. Doutor em Ciência da Computação pela Université de Grenoble, França. Atualmente é pesquisador do Programa de Pós-graduação em Ciência da Computação da Universidade Federal de Santa Catarina (UFSC) e Docente do Departamento de Informática e Estatística (INE)",
        speech_description: "Professor Márcio aborda, nessa talk, algumas das pesquisas científicas desenvolvidas no Departamento de Informática e Estatística da UFSC. Além disso, nos traz um panorama geral dos primeiros passos no mundo da ciência."
    },
    {
        category: "technician",
        speech_day: new Date(2020, 6, 23, 19, 45),
        name: "Ciência de dados: por onde começar?",
        presenter: "Júlia Nakayama",
        presenter_description: "Analista de dados na Linx. Formada em sistemas de inofmração pela UFSC.",
        speech_description: "Júlia nos apresenta nessa talk os primeiros passos para entender o trabalho com dados e ferramentas que podem ajudar nesse processo! "
    },
    {
        category: "market",
        speech_day: new Date(2020, 6, 23, 20, 45),
        name: "Quando estou pronto para ir para uma empresa renomada?",
        presenter: "Felipe Barbosa",
        presenter_description: "Senior Software Engineer na Netflix. Trabalhou no Spotify de 2012 a 2018 no time de engenharia de software.",
        speech_description: "Nesta talk, vamos conhecer a carreira do Felipe e como (e quando) ele percebeu que estava pronto para entrar numa empresa de nível internacional e grande renome. Um incentivo à nos desafiarmos."
    }
]

const Home: React.FC = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    /**
     * Stored 
     */
    const authentication: AuthenticationState = useSelector((state: ApplicationState) => state.authentication);

    /**
     * Effect
     */
    useEffect(() => {
        api.get(`/users/${authentication?.user?.id}`, {
            headers: {
                Authorization: `Bearer ${authentication.token}`
            }
        })
            .then((response) => {
                console.log(response.data);
                dispatch(AuthenticationActions.setUser(response.data));
            })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />

            <Header style={{ paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight + 20 : 20, display: "flex", paddingBottom: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <LogoImage />
                <TouchableOpacity onPress={() => navigation.navigate("User", { id: authentication.user?.id })} activeOpacity={.95} style={{ flexDirection: "row", alignItems: "center" }}>
                    <UserName>
                        {authentication.user?.first_name}
                    </UserName>
                    <ProfileImage source={authentication?.user?.avatar ? { uri: `http://54.197.125.89:3333/uploads/${authentication?.user?.avatar}` } : userProfile} />
                </TouchableOpacity>
            </Header>
            <ScrollabeContainer>
                <Header>
                    <View style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Title size={32} style={{ flex: 1, marginRight: 30 }} numberOfLines={2}>
                            Bem-vindo, {authentication.user?.first_name} {authentication.user?.last_name}
                        </Title>

                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Notifications")}>
                            <MaterialCommunityIcons name="bell" size={50} color="white" style={{ marginLeft: "auto", transform: [{ rotate: "10deg" }] }} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Container>
                    <Title size={30} style={{ marginBottom: 10 }}>Palestras</Title>

                    <View>
                        <Text size={20}>09/07, quinta-feira</Text>

                        {
                            speeches.filter(speech => speech.speech_day.getDate() === 9 || speech.speech_day.getDate() === 17).map((speech, index) => (
                                <SpeechContainer key={index} onPress={() => navigation.navigate("Speech", { speech })} speechCategory={speech.category}>
                                    <SpeechTime>{speech.speech_day.getHours()}:{speech.speech_day.getMinutes()}</SpeechTime>
                                    <View style={{ marginLeft: 15, flex: 1 }}>
                                        <SpeechName>{speech.name}</SpeechName>
                                        <SpeechPresenter>apresentado por {speech.presenter}</SpeechPresenter>
                                    </View>
                                </SpeechContainer>
                            ))
                        }

                        <Caption style={{ marginTop: 10 }}>
                            Clique para expandir detalhes.
                        </Caption>
                    </View>

                    <View style={{ marginTop: 40 }}>
                        <Text size={20}>16/07, quinta-feira</Text>

                        {
                            speeches.filter(speech => speech.speech_day.getDate() === 16).map((speech, index) => (
                                <SpeechContainer key={index} onPress={() => navigation.navigate("Speech", { speech })} speechCategory={speech.category}>
                                    <SpeechTime>{speech.speech_day.getHours()}:{speech.speech_day.getMinutes()}</SpeechTime>
                                    <View style={{ marginLeft: 15, flex: 1 }}>
                                        <SpeechName>{speech.name}</SpeechName>
                                        <SpeechPresenter>apresentado por {speech.presenter}</SpeechPresenter>
                                    </View>
                                </SpeechContainer>
                            ))
                        }

                        <Caption style={{ marginTop: 10 }}>
                            Clique para expandir detalhes.
                    </Caption>
                    </View>

                    <View style={{ marginTop: 40 }}>
                        <Text size={20}>23/07, quinta-feira</Text>

                        {
                            speeches.filter(speech => speech.speech_day.getDate() === 23).map((speech, index) => (
                                <SpeechContainer key={index} onPress={() => navigation.navigate("Speech", { speech })} speechCategory={speech.category}>
                                    <SpeechTime>{speech.speech_day.getHours()}:{speech.speech_day.getMinutes()}</SpeechTime>
                                    <View style={{ marginLeft: 15, flex: 1 }}>
                                        <SpeechName>{speech.name}</SpeechName>
                                        <SpeechPresenter>apresentado por {speech.presenter}</SpeechPresenter>
                                    </View>
                                </SpeechContainer>
                            ))
                        }

                        <Caption style={{ marginTop: 10 }}>
                            Clique para expandir detalhes.
                    </Caption>
                    </View>
                </Container>
            </ScrollabeContainer>
        </View>
    );
}

export default Home;