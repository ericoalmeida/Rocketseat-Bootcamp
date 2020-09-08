import React from 'react';
import { FlatList } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddButton,
  ProductAmount,
  ProductAmountText,
  AddButtonText,
} from './styles';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [
        {
          id: 1,
          title: 'Tênis de Caminhada Leve Confortável',
          price: 179.9,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
        },
        {
          id: 2,
          title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
          price: 139.9,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
        },
        {
          id: 3,
          title: 'Tênis Adidas Duramo Lite 2.0 Detalhes Couro Masculino',
          price: 219.9,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg',
        },
        {
          id: 5,
          title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
          price: 139.9,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
        },
        {
          id: 6,
          title: 'Tênis Adidas Duramo Lite 2.0 Detalhes Couro Masculino',
          price: 219.9,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg',
        },
        {
          id: 4,
          title: 'Tênis de Caminhada Leve Confortável',
          price: 179.9,
          image:
            'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
        },
      ],
    };
  }

  renderizarProduto = ({ item }) => {
    return (
      <Product key={item.id}>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.price}</ProductPrice>

        <AddButton>
          <ProductAmount>
            <Icon name="add-shopping-cart" color="#FFF" size={20} />
            <ProductAmountText>0</ProductAmountText>
          </ProductAmount>
          <AddButtonText>ADICIONAR</AddButtonText>
        </AddButton>
      </Product>
    );
  };

  render() {
    const { products } = this.state;

    return (
      <Container>
        <FlatList
          horizontal
          data={products}
          extraData={this.props}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderizarProduto}
        />
      </Container>
    );
  }
}

export default Home;
