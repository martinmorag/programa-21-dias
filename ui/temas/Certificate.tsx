'use client'

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Vivaldi',
  src: '/fuentes/VIVALDII.TTF', 
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    border: '10px solid #f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#004d40',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00796b',
  },
  content: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333333',
  },
  name: {
    fontFamily: 'Vivaldi',
    fontSize: 48,
    fontWeight: 'extrabold',
    color: '#004d40',
    marginBottom: 20,
    marginTop: 20,
  },
  footer: {
    fontSize: 14,
    color: '#555555',
    marginTop: 30,
    textAlign: 'center',
  },
});

interface CertificateProps {
  userName: string;
  isPersonalContent: boolean;
}

const Certificate = ({ userName, isPersonalContent }: CertificateProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.header}>Certificado de Finalización</Text>
      </View>
      <View>
        <Text style={styles.content}>Este certificado es otorgado a</Text>
      </View>
      <View>
        <Text style={styles.name}>{userName}</Text>
      </View>
      <View>
        <Text style={styles.content}>por la exitosa finalización del curso:</Text>
      </View>
      <View>
        <Text style={styles.title}>
          Programa 21 Días: {isPersonalContent ? 'Emprendedor y Contenido Personal' : 'Emprendedor'}
        </Text>
      </View>
      <View>
        <Text style={styles.footer}>
          Fechado: {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
        </Text>
      </View>
    </Page>
  </Document>
);

export default Certificate;