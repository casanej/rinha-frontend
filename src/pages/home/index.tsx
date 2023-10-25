import { useState, useEffect, useCallback } from 'react';
import { InputFile } from '../../components';
import * as S from './index.style';
import JsonViewerPage from '../json-viewer';
import { JsonTreeObject } from '../../models/json-viewer';

export default function HomePage () {
  const [json, setJson] = useState<JsonTreeObject>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  useEffect(() => {

    window.onbeforeunload = () => {
      setJson(undefined);
      setLoading(false);
      setShowErrorMessage(false);
    };
  }, [])

  const handleFileChange = useCallback(async (file: File) => {
    setShowErrorMessage(false);
    setLoading(true);

    if (file.type !== 'application/json') {
      setShowErrorMessage(true);
      return;
    }

    try {
      setJson({
        data: JSON.parse(await file.text()),
        name: file.name
      });
    } catch (error) {
      setShowErrorMessage(true);
    } finally {
      setLoading(false);
    }
  }, [])

  const handleBack = () => {
    setJson(undefined);
    setLoading(false);
    setShowErrorMessage(false);
  }

  if (loading) return <S.HomePageStyled>
    <S.HomePageTitle>Carregando...</S.HomePageTitle>
  </S.HomePageStyled>

  if (json) return <S.HomePageStyled>
    <JsonViewerPage file={json} onBack={handleBack} />
  </S.HomePageStyled>

  return <S.HomePageStyled>
    <S.HomePageTitle>JSON Tree Viewer</S.HomePageTitle>
    <div>Simple JSON viewer that runs completely on-client. No data exchange</div>
    <InputFile accept="application/json" onChange={handleFileChange} aria-label="JSON Input" />
    {
      showErrorMessage && <S.HomePageErrorMessage>Invalid JSON file. Please load a valid JSON file.</S.HomePageErrorMessage>
    }
  </S.HomePageStyled>
};
