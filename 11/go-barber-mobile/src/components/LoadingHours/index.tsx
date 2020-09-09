import React, { useState } from 'react';

import {
  Container,
  SectionContent,
  SectionTitle,
  Hour,
  HourText,
} from './styles';

const LoadingHours: React.FC = () => {
  const [hours, setHours] = useState(['00:00', '00:00', '00:00', '00:00']);

  return (
    <Container>
      <SectionTitle />

      <SectionContent>
        {hours.map((hour, index) => {
          return (
            <Hour key={index}>
              <HourText>{hour}</HourText>
            </Hour>
          );
        })}
      </SectionContent>

      <SectionTitle />

      <SectionContent>
        {hours.map((hour, index) => {
          return (
            <Hour key={index}>
              <HourText>{hour}</HourText>
            </Hour>
          );
        })}
      </SectionContent>
    </Container>
  );
};

export default LoadingHours;
