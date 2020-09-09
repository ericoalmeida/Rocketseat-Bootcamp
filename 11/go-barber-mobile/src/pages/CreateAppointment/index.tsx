import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Alert } from 'react-native';
import { format } from 'date-fns';

import api from '../../services/api';
import { Provider } from '../Dashboard';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  CalendarContainer,
  CalendarTitle,
  OpenDateTimePickerButton,
  OpenDateTimePickerButtonText,
  Schedule,
  ScheduleTitle,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

import LoadingHours from '../../components/LoadingHours';

interface RouteParams {
  providerId: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const { user } = useAuth();
  const { goBack, navigate } = useNavigation();

  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  const [loadingHoras, setLoadingHoras] = useState(false);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    api.get('/providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    setLoadingHoras(true);

    api
      .get(`/providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setAvailability(response.data);

        setLoadingHoras(false);
      });
  }, [selectedDate, selectedProvider]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDateTimePicker(state => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDateTimePicker(false);
      }

      date && setSelectedDate(date);
    },
    [],
  );

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);
      date.setSeconds(0);

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigate('AppointmentCreated', { date: date.getTime() });
    } catch (error) {
      Alert.alert('Oops!', 'Ocorreu um erro ao crar agendamento');
    }
  }, [navigate, selectedDate, selectedHour, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        };
      });
  }, [availability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleileiros</HeaderTitle>

        <UserAvatar
          source={{
            uri: user.avatar_url
              ? user.avatar_url
              : `https://api.adorable.io/avatars/286/${user.name}@adorable.png`,
          }}
        />
      </Header>

      <Content>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                selected={provider.id === selectedProvider}
                onPress={() => handleSelectProvider(provider.id)}
              >
                <ProviderAvatar
                  source={{
                    uri: provider.avatar_url
                      ? provider.avatar_url
                      : `https://api.adorable.io/avatars/286/${provider.name}@adorable.png`,
                  }}
                />

                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <CalendarContainer>
          <CalendarTitle>Escolha a data</CalendarTitle>

          <OpenDateTimePickerButton onPress={handleToggleDatePicker}>
            <OpenDateTimePickerButtonText>
              Selecionar outra data
            </OpenDateTimePickerButtonText>
          </OpenDateTimePickerButton>

          {showDateTimePicker && (
            <DateTimePicker
              mode="date"
              value={selectedDate}
              display="spinner"
              textColor="#f4ede8"
              onChange={handleDateChanged}
            />
          )}
        </CalendarContainer>

        <Schedule>
          <ScheduleTitle>Escolha um horário</ScheduleTitle>

          {loadingHoras ? (
            <LoadingHours />
          ) : (
            <>
              <Section>
                <SectionTitle>Manhã</SectionTitle>
                <SectionContent>
                  {morningAvailability.map(
                    ({ hourFormatted, available, hour }) => {
                      return (
                        <Hour
                          enabled={available}
                          selected={selectedHour === hour}
                          available={available}
                          key={hourFormatted}
                          onPress={() => handleSelectHour(hour)}
                        >
                          <HourText selected={selectedHour === hour}>
                            {hourFormatted}
                          </HourText>
                        </Hour>
                      );
                    },
                  )}
                </SectionContent>
              </Section>

              <Section>
                <SectionTitle>Tarde</SectionTitle>

                <SectionContent>
                  {afternoonAvailability.map(
                    ({ hourFormatted, available, hour }) => {
                      return (
                        <Hour
                          enabled={available}
                          selected={selectedHour === hour}
                          available={available}
                          key={hourFormatted}
                          onPress={() => handleSelectHour(hour)}
                        >
                          <HourText selected={selectedHour === hour}>
                            {hourFormatted}
                          </HourText>
                        </Hour>
                      );
                    },
                  )}
                </SectionContent>
              </Section>
            </>
          )}
        </Schedule>

        {!loadingHoras && (
          <CreateAppointmentButton
            enabled={selectedHour !== 0}
            onPress={handleCreateAppointment}
          >
            <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
          </CreateAppointmentButton>
        )}
      </Content>
    </Container>
  );
};

export default CreateAppointment;
