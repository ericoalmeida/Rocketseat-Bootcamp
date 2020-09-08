import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
  MdRemoveShoppingCart,
} from 'react-icons/md';

import { formatPrice } from '../../Util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { Container, TabelaProduto, Total, ContainerEmptyCart } from './style';

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  function cartIsEmpty() {
    return cart.length === 0;
  }

  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return cartIsEmpty() ? (
    <ContainerEmptyCart>
      <MdRemoveShoppingCart color="#999" size={65} />
      <strong>Seu carrinho está vazio :(</strong>
      <span>Aproveite nossas ofertas</span>
    </ContainerEmptyCart>
  ) : (
    <Container>
      <TabelaProduto>
        <thead>
          <th />
          <th>PRODUTO</th>
          <th>QTDE</th>
          <th>SUBTOTAL</th>
          <th />
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>

                  <input type="number" readOnly value={product.amount} />

                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TabelaProduto>

      <footer>
        <button type="button">FINALIZAR PEDIDO</button>
        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(prod => ({
    ...prod,
    subtotal: formatPrice(prod.price * prod.amount),
  })),

  total: formatPrice(
    state.cart.reduce((total, prod) => {
      return total + prod.price * prod.amount;
    }, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
