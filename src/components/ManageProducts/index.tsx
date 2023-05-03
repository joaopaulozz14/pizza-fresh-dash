import { Add } from "../../assets/icons";
import { HTMLAttributes, useEffect, useState } from "react";
import * as S from "./styles";
import EditProduct from "../EditProduct";
import { Product, ProductResponse } from "../../types/api/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QueryKey } from "../../types/QueryKey";
import { ProductService } from "../../services/ProductService";
import { ErrorResponse } from "../../types/api/error";

type ManageProductsType = HTMLAttributes<HTMLDivElement>;

type ManageProductsProps = {} & ManageProductsType;

const ManageProducts = ({ ...props }: ManageProductsProps) => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const form = {
    name: "",
    description: "",
    price: Number(""),
    image: "",
  };
  const [productToAdd, setProductToAdd] = useState(form);
  const [isAdding, setIsAdding] = useState(false);
  const [cancel, setCancel] = useState(false);
  const { data: productsData } = useQuery(
    [QueryKey.PRODUCTS],
    ProductService.getLista
  );

  //Add Functions
  const add = useMutation(ProductService.create, {
    onSuccess: (data: ProductResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }

      const productList = [...products, data as ProductResponse];
      setProducts(productList);
    },

    onError: () => {
      console.log("Erro ao adicionar um produto");
    },
  });

  const productIsValid = () =>
    Boolean(
      productToAdd.name.length &&
        productToAdd.description.length &&
        productToAdd.toString().length &&
        productToAdd.image.length
    );

  const productFormatter = (toFormat: typeof form): Product => ({
    name: toFormat.name,
    description: toFormat.description,
    price: toFormat.price,
    image: toFormat.image,
  });

  const handleAddChange = (name: string, value: string | number) => {
    setProductToAdd({ ...productToAdd, [name]: value });
  };

  //Update Functions
  const update = useMutation(ProductService.updateById, {
    onSuccess: (data: ProductResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }
      const editedProducts = products.map((i) =>
        data.id === i.id ? (data as ProductResponse) : i
      );
      setProducts(editedProducts);
    },
    onError: () => {
      console.log("Erro ao tentar atualizar o produto");
    },
  });

  let productsToEdit: ProductResponse[] = [];
  const onEditProduct = (toEdit: ProductResponse) => {
    setCancel(false);
    const existing = productsToEdit.find((user) => user.id === toEdit.id);
    productsToEdit = existing
      ? productsToEdit.map((i) => (i.id === existing.id ? toEdit : i))
      : [...productsToEdit, toEdit];
    console.log(productsToEdit);
  };

  //Delete functions
  const remove = useMutation(ProductService.deleteById, {
    onSuccess: (data: ProductResponse & ErrorResponse) => {
      if (data.statusCode) {
        return;
      }
      const editedProducts = products.filter(
        (product) => product.id !== data.id
      );
      setProducts(editedProducts);
    },
    onError: () => {
      console.log("Erro ao tentar deletar produto pelo id");
    },
  });
  const onDeleteProduct = (data: ProductResponse) => {
    remove.mutate(data.id);
    handleCancel();
  };

  //Handle save and cancel
  const handleSave = () => {
    const canAdd = productIsValid();
    const productedFormatted = productFormatter(productToAdd);

    productsToEdit.forEach((product) => {
      update.mutate({ product, id: product.id });
    });

    if (canAdd) add.mutate(productedFormatted);

    setTimeout(() => handleCancel(), 300);
    setProductToAdd(form);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setCancel(true);
    setIsAdding(false);
    setTimeout(() => setCancel(false));
    productsToEdit = [];
  };

  useEffect(() => {
    setProducts(productsData || []);
  }, [productsData]);

  return (
    <S.ManageProducts {...props}>
      <S.ManageProductsTitle>Gerenciar Produtos</S.ManageProductsTitle>
      <S.ManageProductsSub>
        <b>Pizzas</b>
      </S.ManageProductsSub>
      <S.ManageProductsContent>
        {!isAdding ? (
          <S.ManageProductsContentAdd
            onClick={() => {
              setIsAdding(!isAdding);
            }}
          >
            <Add />
            <span>Adicionar Pizza</span>
          </S.ManageProductsContentAdd>
        ) : (
          <S.AddCard>
            <S.EditForm
              type="text"
              placeholder="Título"
              success={Boolean(productToAdd.name.length)}
              value={productToAdd.name || ""}
              onChange={({ target }) => {
                handleAddChange("name", target.value);
              }}
            />
            <S.EditForm
              type="text"
              placeholder="Descrição"
              success={Boolean(productToAdd.description.length)}
              value={productToAdd.description || ""}
              onChange={({ target }) => {
                handleAddChange("description", target.value);
              }}
            />
            <S.EditForm
              type="number"
              placeholder="Preço"
              success={Boolean(productToAdd.price)}
              value={productToAdd.price || ""}
              onChange={({ target }) => {
                handleAddChange("price", +target.value);
              }}
            />
            <S.EditForm
              type="url"
              placeholder="Imagem"
              success={Boolean(productToAdd.image.length)}
              value={productToAdd.image || ""}
              onChange={({ target }) => handleAddChange("image", target.value)}
            />
          </S.AddCard>
        )}

        {products.map((product, index) => (
          <EditProduct
            product={product}
            key={index}
            onEdit={onEditProduct}
            onCancel={cancel}
            onDelete={onDeleteProduct}
          />
        ))}
      </S.ManageProductsContent>
      <S.ManageProductsActions>
        <S.ManageProductsActionsCancel onClick={handleCancel}>
          Cancelar
        </S.ManageProductsActionsCancel>
        <S.ManageProductsActionsSave onClick={handleSave}>
          Salvar Mudanças
        </S.ManageProductsActionsSave>
      </S.ManageProductsActions>
    </S.ManageProducts>
  );
};

export default ManageProducts;
