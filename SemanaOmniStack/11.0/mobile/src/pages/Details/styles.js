import {StyleSheet} from 'react-native';
import Constantes from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: Constantes.statusBarHeight + 20,
    backgroundColor: "#f5f5f5"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    marginTop: 48
  },

  incidentProperty: {
    fontSize: 14,
    color: "#41414d",
    fontWeight: "bold"
  },

  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: "#737380" 
  },

  contact: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
  },

  heroTitle: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 30,
    color: "#13131a"
  },

  heroDescription: {
    fontSize: 15,
    color: "#737380",
    marginTop: 10
  },

  actionView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  action: {
    backgroundColor: "#e02041",
    borderRadius: 8,
    height: 50,
    width: '48%',
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  actionText: {
    marginLeft: 5,
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold"
  }
})