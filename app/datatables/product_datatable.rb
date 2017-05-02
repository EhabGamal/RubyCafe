class ProductDatatable < AjaxDatatablesRails::Base

  # or define them in one pass
  def_delegators :@view, :params, :fa_icon, :link_to, :product_path, :edit_product_path, :semantic_icon


  def sortable_columns
    # Declare strings in this format: ModelName.column_name
    @sortable_columns ||= [
        'Product.id',
        'Product.name',
        'Product.description'
    ]
  end

  def searchable_columns
    # Declare strings in this format: ModelName.column_name
    @searchable_columns ||= [
        'Product.name',
        'Product.description'
    ]
  end

  private

  def data
    records.map do |record|
      [
          # comma separated list of the values for each cell of a table row
          # example: record.attribute,
          record.id,
          record.name,
          record.description,
          record.price,
          record.available,
          record.category.name,
          link_to(semantic_icon('play'), product_path(record)),
          link_to(semantic_icon('edit'), edit_product_path(record)),
          link_to(semantic_icon('remove'),record, method: :delete)
      ]
    end
  end

  def get_raw_records
    # insert query here
    Product.all
  end

  # ==== Insert 'presenter'-like methods below if necessary
end
